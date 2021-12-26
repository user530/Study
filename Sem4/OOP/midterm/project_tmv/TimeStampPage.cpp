#include "TimestampPage.h"

/** Timestamp page constructor, holds several product pages */
TimestampPage::TimestampPage(){};

/** Function to add new product page to the timestamp page
 * @param prodName product name to store associated data
 * @param prodPage group object that holds related orders
 * */
void TimestampPage::addProductPage(const std::string prodName, const ProductPage &prodPage)
{
    //  Insert selected productPage associated with the given name
    _timedOrders.insert({prodName, prodPage});
};

/** Print timestamp page and all its content */
void TimestampPage::printTimestampPage()
{
    // Iterate over all products
    for (auto &[prodName, prodPage] : _timedOrders)
    {
        std::cout << "      Product page: " << prodName << " {\n";
        prodPage.printProductPage();
        std::cout << "      }" << std::endl;
    }
};
