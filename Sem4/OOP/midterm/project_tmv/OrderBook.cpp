#include "OrderBook.h"
#include "CSVReader.h"

/** Orderbook */
Orderbook::Orderbook(const std::string fileName)
{
    _orderbook = CSVReader::transformCSV(fileName);
};