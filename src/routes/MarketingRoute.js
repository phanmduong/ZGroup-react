import HistoryCallsContainer from "../modules/historyCalls/HistoryCallsContainer";
import MarketingCampaignContainer from "../modules/marketingCampaign/MarketingCampaignContainer";
import MarketingCampaignUpContainer from "../modules/marketingCampaignUp/MarketingCampaignUpContainer";
import SummaryMarketingCampaignContainer from "../modules/summaryMarketingCampaign/SummaryMarketingCampaignContainer";
import SummarySalesContainer from "../modules/summarySales/SummarySalesContainer";
import OverviewSales from "../modules/summarySales/OverviewSales";
import StatisticSales from "../modules/summarySales/StatisticSales";

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
    }
];
