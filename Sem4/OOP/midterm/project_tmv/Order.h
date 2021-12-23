#pragma once
#include <string>

class Order
{
public:
    /** Constructor */
    Order(const unsigned int, double, double, std::string, std::string);

    /** Order ID */
    const unsigned int id;
    /** Order price */
    double price;
    /** Order amount */
    double amount;
    /** Order buyer */
    std::string buyer;
    /** Order seller */
    std::string seller;
};