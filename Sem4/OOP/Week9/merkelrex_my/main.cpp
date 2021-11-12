#include <iostream>
#include <string>
#include <vector>
#include "OrderBookEntry.h"
#include "csvReader.h"
#include "MerkelMain.h"

#include "Wallet.h" //Testing!
int main()
{
    // MerkelMain app;
    // app.init();

    Wallet wallet; //Testing!

    wallet.insertCurrency("BTC", 10.0);

    std::cout << "Wallet contains 5 BTC - "
              << wallet.containsCurrency("BTC", 5.0)
              << std::endl;

    std::cout << "Wallet contains 5 DOGE - "
              << wallet.containsCurrency("DOGE", 5.0)
              << std::endl;

    std::cout << wallet.toString() << std::endl;

    wallet.removeCurrency("BTC", 8.5);
    std::cout << "After we remove 8.5 BTC..." << std::endl;
    wallet.insertCurrency("USD", 5000);
    wallet.insertCurrency("BTC", 2.5);
    wallet.removeCurrency("BTC", 3.81);
    std::cout << wallet.toString() << std::endl;

    return 0;
}