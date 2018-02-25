import HistoryCallsContainer from "../modules/historyCalls/HistoryCallsContainer";
import MarketingCampaignContainer from "../modules/marketingCampaign/MarketingCampaignContainer";
import MarketingCampaignUpContainer from "../modules/marketingCampaignUp/MarketingCampaignUpContainer";
import SummaryMarketingCampaignContainer from "../modules/summaryMarketingCampaign/SummaryMarketingCampaignContainer";
import SummaryMarketingCampaignUpContainer from "../modules/summaryMarketingCampaignUp/SummaryMarketingCampaignUpContainer";
import SummarySalesContainer from "../modules/summarySales/SummarySalesContainer";
import OverviewSales from "../modules/summarySales/OverviewSales";
import StatisticSales from "../modules/summarySales/StatisticSales";

import SummarySalesUpContainer from "../modules/summarySalesUp/SummarySalesUpContainer";
import OverviewSalesUp from "../modules/summarySalesUp/OverviewSalesUp";
import StatisticSalesUp from "../modules/summarySalesUp/StatisticSalesUp";

/**
 * Tab Quản lý marketing
 */
export default [
    {
        path: "/marketing/telesalehistory(/:callerId)",
        component: HistoryCallsContainer
    },
    {
        path: "/marketing/marketing-campaign-up",
        component: MarketingCampaignUpContainer
    },
    {
        path: "/marketing/marketing-campaign",
        component: MarketingCampaignContainer
    },
    {
        path: "/marketing/marketing-campaign/summary",
        component: SummaryMarketingCampaignContainer,
    },
    {
        path: "/marketing/marketing-campaign-up/summary",
        component: SummaryMarketingCampaignUpContainer,
    },
    {
        path: "/marketing/sales",
        component: SummarySalesContainer,
        children: [
            {
                path: "/",
                component: OverviewSales
            },
            {
                path: "statistic",
                component: StatisticSales
            }
        ]
    },


    {
        path: "/marketing/sales-up",
        component: SummarySalesUpContainer,
        children: [
            {
                path: "/",
                component: OverviewSalesUp
            },
            {
                path: "statistic",
                component: StatisticSalesUp
            }
        ]
    }
];
