#include "Order.h"
#include <iostream>

/** Constructor function for the single order
 * @param id identification number
 * @param price order price
 * @param amount order amount
 * @param buyer order buyer, if not specified set to - "none"
 * @param seller order seller, if not specified set to - "none"
 */
Order::Order(double argPrice,
             double argAmount,
             std::string argBuyer,
             std::string argSeller) : price(argPrice),
                                      amount(argAmount),
                                      buyer(argBuyer),
                                      seller(argSeller){};
