#include "Order.h"

/** Constructor function for the single order
 * @param id identification number
 * @param price order price
 * @param amount order amount
 * @param owner order owner, if not specified set to - "dataset"
 */
Order::Order(const unsigned int argId,
             double argPrice,
             double argAmount,
             std::string argOwner = "dataset") : id(argId),
                                                 price(argPrice),
                                                 amount(argAmount),
                                                 owner(argOwner){};