#include "Wallet.h"
#include "csvReader.h"
Wallet::Wallet(){};

void Wallet::insertCurrency(const std::string type, double amount)
{
    // variable to hold balance
    double balance;
    // if we try to add negative amount of currency
    if (amount < 0)
    {
        // throw an exception
        throw std::exception{};
    }
    // If there is no currency of this type currently in the wallet
    if (currencies.count(type) == 0)
    {
        // We set initial balance to zero
        balance = 0;
    }
    // If there is currency of this type already in the wallet
    else
    {
        // set appropriate balance value
        balance = currencies[type];
    }

    // Add amount to the balance and update the wallet itself
    balance += amount;
    currencies[type] = balance;
};

bool Wallet::removeCurrency(const std::string type, double amount)
{
    // variable to hold balance
    double balance;
    // if we try to remove negative amount of currency (add?)
    if (amount < 0)
    {
        // throw an exception
        throw std::exception{};
    }
    // If there is no currency of this type currently in the wallet
    if (currencies.count(type) == 0) //not there yet
    {
        // We cant remove this amount -> return false to signal
        return false;
    }
    // If there is currency of this type already in the wallet...
    else
    {
        // and we have enough
        if (containsCurrency(type, amount))
        {
            // remove specified amount from the wallet and flag success
            currencies[type] -= amount;
            return true;
        }
        // but not enough
        else
        {
            return false;
        }
    }
};

bool Wallet::containsCurrency(const std::string type, const double amount)
{
    // If there is no currency of this type currently in the wallet
    if (currencies.count(type) == 0)
    {
        // Signal that there is no currency
        return false;
    }
    else
    {
        // otherwise -> signal if there is enough in the wallet (true or false)
        return currencies[type] >= amount;
    }
};

bool Wallet::canFulfillOrder(const OrderBookEntry &order)
{
    // Variables for order currencies pair, required currency and required amount
    std::vector<std::string> currencies = CSVReader::tokenise(order.product, '/');
    std::string currency;
    double amount;

    // Ask order type
    if (order.orderType == OrderBookType::ask)
    {
        // In Ask we offer to sell first currency in exchange for the second
        currency = currencies[0];

        // In Ask we offer to sell specified amount, so we need this amount available
        amount = order.amount;

        // We return flag according to the wallet currencies status
        return containsCurrency(currency, amount);
    }
    else if (order.orderType == OrderBookType::bid)
    {
        // In Bid we offer to exchange second currency for the first one
        currency = currencies[1];

        // In Bid we offer to exchange each unit of currency one for "price" amount of second currency
        amount = order.price * order.amount;

        // We return flag according to the wallet currencies status
        return containsCurrency(currency, amount);
    }

    // If for some reason Order type is unknown, we return false
    return false;
};

std::string Wallet::toString()
{
    // Declare result variable
    std::string walletStr;

    // Iterate over all
    for (const std::pair<const std::string, double> &pair : currencies)
    {
        std::string cur = pair.first;
        double amount = pair.second;
        // add the line of the actual currency
        if (amount > 0)
        {
            walletStr += "Currency: " + cur +
                         ", amount: " + std::to_string(amount) + "\n";
        }
    }

    // return the content of the wallet
    return walletStr;
};

void Wallet::processSale(const OrderBookEntry &sale)
{
    // Variables for sale currencies pair, required currency and required amount
    std::vector<std::string> currencyPairs = CSVReader::tokenise(sale.product, '/');

    // Ask sale
    if (sale.orderType == OrderBookType::asksale)
    {
        // Currency that will leave the wallet
        std::string currencyLeave = currencyPairs[0];
        // amount that will leave
        double amountLeave = sale.amount;
        // execute subtraction from the wallet
        currencies[currencyLeave] -= amountLeave;

        // Currency that will be added to the wallet
        std::string currencyAdd = currencyPairs[1];
        // amount that will be added
        double amountAdd = sale.amount * sale.price;
        // execute addition to the wallet
        currencies[currencyAdd] += amountAdd;
    }
    else if (sale.orderType == OrderBookType::bidsale)
    {
        // Currency that will leave the wallet
        std::string currencyLeave = currencyPairs[1];
        // amount that will leave
        double amountLeave = sale.amount * sale.price;
        // execute subtraction from the wallet
        currencies[currencyLeave] -= amountLeave;

        // Currency that will be added to the wallet
        std::string currencyAdd = currencyPairs[0];
        // amount that will be added
        double amountAdd = sale.amount;
        // execute addition to the wallet
        currencies[currencyAdd] += amountAdd;
    }
};

std::ostream &operator<<(std::ostream &os, Wallet &wallet)
{
    os << wallet.toString();
    return os;
};