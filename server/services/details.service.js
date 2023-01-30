const httpStatus = require("http-status");
const ApiError = require("../lib/ApiError");
const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const perDaySells = async (query) => {
  const { start, end } = query;
  const results = await sequelize.query(
    `SELECT fuel.date as fuel_date,sell_quantity_diesel,invest_diesel,earn_diesel,profit_diesel,sell_quantity_octane,invest_octane,earn_octane,profit_octane,sell_quantity_mobil,invest_mobil,earn_mobil,profit_mobil,coalesce(expense, 0) as expense,(invest_diesel+invest_octane+invest_mobil) as invest,(earn_diesel+earn_mobil+earn_octane) as earn,(( COALESCE(profit_diesel,0)+ COALESCE(profit_mobil,0)+COALESCE(profit_octane,0))-COALESCE(expense,0)) as profit
  FROM (select date, sum(sell_quantity1) as sell_quantity_diesel, sum(sell_quantity2) as sell_quantity_octane,sum(sell_quantity3) as sell_quantity_mobil,
               sum(earn1) as earn_diesel,sum(earn2) as earn_octane,sum(earn3) as earn_mobil,
               sum(invest1) as invest_diesel, sum(invest2) as invest_octane,sum(invest3) as invest_mobil,
               sum(profit1) as profit_diesel, sum(profit2) as profit_octane, sum(profit3) as profit_mobil
        from ((select date(date) as date, sum(profit) as profit1, 0 as profit2, 0 as profit3,
                      sum(sell_quantity) as sell_quantity1,0 as sell_quantity2, 0 as sell_quantity3,
                      sum(earn) as earn1,0 as earn2, 0 as earn3,
                      sum(invest) as invest1, 0 as invest2, 0 as invest3
               from "Diesels"
               group by date(date)
              ) union all
              (select date(date) as date, 0 as profit1, sum(profit) as profit2, 0 as profit3,
                      0 as sell_quantity1,sum(sell_quantity) as sell_quantity2,0 as sell_quantity3,
                      0 as earn1,sum(earn) as earn2, 0 as earn3,
                      0 as invest1, sum(invest) as invest2, 0 as invest3
               from "Octanes"
               group by date(date)
              ) union all
              (select date(date) as date, 0 as profit1,0 as profit2, sum(profit) as profit3,
                      0 as sell_quantity1,0 as sell_quantity2,sum(sell_quantity) as sell_quantity3,
                      0 as earn1,0 as earn2, sum(earn) as earn3,
                      0 as invest1, 0 as invest2, sum(invest) as invest3
               from "Mobils"
               group by date(date)
              )
             ) t
        group by date) fuel LEFT JOIN (SELECT date,sum(amount) as expense from "Expenses" group by date) expense ON fuel.date = expense.date where fuel.date between :start and :end order by 1 asc limit 100
          `,
    {
      replacements: { start: start, end: end },
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    }
  );
  return results;
};
const perMonthSells = async (query) => {
  const { year } = query;
  const results = await sequelize.query(
    `select d.month as month,d.sell_quantity as sell_quantity_diesel,d.invest as invest_diesel,d.earn as earn_diesel, d.profit as profit_diesel,
    o.sell_quantity as sell_quantity_octane,o.invest as invest_octane,o.earn as earn_octane, o.profit as profit_octane,
    m.sell_quantity as sell_quantity_mobil,m.invest as invest_mobil,m.earn as earn_mobil, m.profit as profit_mobil,e.expense as exp
from (select derived.mm as month,
                COALESCE(sum(u.sell_quantity),0) as sell_quantity,
                   COALESCE(sum(u.invest),0) as invest,
                   COALESCE(sum(u.earn),0) as earn,
                   COALESCE(sum(u.profit),0) as profit from (
                     SELECT 1 mm UNION ALL SELECT 2 UNION ALL SELECT 3
                     UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
                     UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
                     UNION ALL SELECT 12
                 ) derived left join public."Diesels" u on derived.mm = EXTRACT(MONTH FROM date) and u.date >= (make_date(:year,1,1)) and u.date<(make_date(:year,1,1)+INTERVAL '1 YEAR')
            group by derived.mm ) d left join
             (select derived.mm as month,
            COALESCE(sum(u.sell_quantity),0) as sell_quantity,
                   COALESCE(sum(u.invest),0) as invest,
                   COALESCE(sum(u.earn),0) as earn,
                   COALESCE(sum(u.profit),0) as profit 
                     from
             (SELECT 1 mm UNION ALL SELECT 2 UNION ALL SELECT 3
             UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
             UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
             UNION ALL SELECT 12) derived left join public."Octanes" u on derived.mm = EXTRACT(MONTH FROM date) and  u.date >= (make_date(:year,1,1)) and u.date<(make_date(:year,1,1)+INTERVAL '1 YEAR')
            group by derived.mm ) o on d.month=o.month left join (select derived.mm as month,
            COALESCE(sum(u.sell_quantity),0) as sell_quantity,
                   COALESCE(sum(u.invest),0) as invest,
                   COALESCE(sum(u.earn),0) as earn,
                   COALESCE(sum(u.profit),0) as profit 
             from (
             SELECT 1 mm UNION ALL SELECT 2 UNION ALL SELECT 3
             UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
             UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
             UNION ALL SELECT 12) derived left join public."Mobils" u on derived.mm = EXTRACT(MONTH FROM date) and u.date >= (make_date(:year,1,1)) and u.date<(make_date(:year,1,1)+INTERVAL '1 YEAR')
            group by derived.mm  ) m on d.month=m.month left join
 (select derived.mm as month,
 COALESCE(sum(u.amount),0) as expense  from
         (SELECT 1 mm UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 )  derived left join public."Expenses" u on derived.mm = EXTRACT(MONTH FROM date) and  u.date >= (make_date(:year,1,1)) and u.date<(make_date(:year,1,1)+INTERVAL '1 YEAR')
            group by derived.mm ) e on d.month=e.month order by month
`,
    {
      replacements: { year: year },
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    }
  );
  return results;
};

module.exports = { perDaySells,perMonthSells };
