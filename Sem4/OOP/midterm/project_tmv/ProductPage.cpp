#include "ProductPage.h"

/** Product page constructor, holds several ordertype groups */
ProductPage::ProductPage(){};

/** Function to add new ordertype group to the product page
 * @param ordertypeGroup ordertype group that will be added to the product container
 * */
void ProductPage::addOrdertypeGroup(OrderType groupType, OrdertypeGroup ordertypeGroup)
{
    //  Insert selected ordertypeGroup associated with the required groupType
    _productOrders.insert({groupType, ordertypeGroup});
};

void ProductPage::printProductPage()
{
    // Iterate over all groups in product page
    for (auto [groupName, ordergroup] : _productOrders)
    {
        // Print ordergroup name
        std::cout << "Order group: " << groupName << " {\n";
        // Print all orders from this group
        ordergroup.printGroup();
        std::cout << "}" << std::endl;
    }
};

int main()
{
    Order ord1{10, 1};
    Order ord2{5, 8};
    Order ord3{8, 1};
    OrdertypeGroup bid;
    bid.addOrder(ord1);
    bid.addOrder(ord2);
    bid.addOrder(ord3);
    ProductPage ETH;
    ETH.addOrdertypeGroup(OrderType::bid, bid);

    ETH.printProductPage();
}