#include "OrderBookEntry.h"

OrderBookEntry::OrderBookEntry(
    double _price,
    double _amount,
    std::string _timestamp,
    std::string _product,
    OrderBookType _orderType)
    : price(_price),
      amount(_amount),
      timestamp(_timestamp),
      product(_product),
      orderType(_orderType){};

OrderBookType OrderBookEntry::stringToOBT(std::string token)
{
  // If token is 'ask' -> return ask type
  if (token == "ask")
  {
    return OrderBookType::ask;
  }

  // If token is 'bid' -> return bid type
  if (token == "bid")
  {
    return OrderBookType::bid;
  }

  // Else, return unknown type
  return OrderBookType::unknown;
};

bool OrderBookEntry::compareByTimestamp(const OrderBookEntry &entry1, const OrderBookEntry &entry2)
{
  return entry1.timestamp < entry2.timestamp;
};