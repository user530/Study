#include "ProductPage.h"

/** Product page constructor, holds several ordertype groups */
ProductPage::ProductPage(){};

/** Function to add new ordertype group to the product page
 * @param groupType ordertype of the ordergroup (bid,ask,sale)
 * @param ordertypeGroup group object that holds related orders
 * */
void ProductPage::addOrdertypeGroup(OrderType groupType, OrdertypeGroup ordertypeGroup)
{
    //  Insert selected ordertypeGroup associated with the required groupType
    _productOrders.insert({groupType, ordertypeGroup});
};

/** Print product page and all its content */
void ProductPage::printProductPage()
{
    // Iterate over all groups in product page
    for (auto [groupName, ordergroup] : _productOrders)
    {
        // Print ordergroup name
        std::cout << "          Order group: " << groupName << " {\n";
        ordergroup.printGroup();
        std::cout << "          }" << std::endl;
    }
};
