#pragma once
#include <string>

class Order
{
public:
    /** Constructor */
    Order(double, double, std::string = "none", std::string = "none");

    /** Order price */
    double price;
    /** Order amount */
    double amount;
    /** Order buyer */
    std::string buyer;
    /** Order seller */
    std::string seller;
};