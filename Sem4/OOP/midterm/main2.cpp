#include <iostream>
#include <map>

void welcome()
{
    // Welcoming message
    std::cout << "=============================\n\n"
              << "Welcome to TradeSim!\n"
              << std::endl;
}

void print_menu()
{
    // Print available options
    std::cout << "Please select your action:\n"
              << "1) Print help;\n"
              << "2) Print exchange stats;\n"
              << "3) Make an offer;\n"
              << "4) Make a bid;\n"
              << "5) Print wallet;\n"
              << "6) Continue.\n\n"
              << "=============================\n"
              << std::endl;
}

int get_user_option()
{
    // Declare the result variable
    int user_option;

    // Ask for the prompt
    std::cout << "Type in 1-6 to choose action..." << std::endl;

    // Prompt and visualize
    std::cin >> user_option;
    std::cout
        << "You selected option #"
        << user_option
        << "\n\n=============================\n"
        << std::endl;

    return user_option;
}

void print_help()
{
    std::cout << "Help - your aim is to make money.\n"
              << "Analyse the market and make bids "
              << "and offers to raise some currency.\n\n"
              << "=============================\n"
              << std::endl;
}

void print_market_stats()
{
    std::cout << "Market looks good\n\n"
              << "=============================\n"
              << std::endl;
}

void make_offer()
{
    std::cout << "Make an offer\n\n"
              << "=============================\n"
              << std::endl;
}

void make_bid()
{
    std::cout << "Make a bid\n\n"
              << "=============================\n"
              << std::endl;
}

void print_wallet()
{
    std::cout << "No money, honey\n\n"
              << "=============================\n"
              << std::endl;
}

void time_skip()
{
    std::cout << "A few moments later...\n\n"
              << "=============================\n"
              << std::endl;
}

void warning()
{
    std::cout << "Invalid input command, please try again!\n\n"
              << "=============================\n"
              << std::endl;
}

void process_user_option(int user_option)
{
    // React accordingly to the input
    switch (user_option)
    {
    case 1:
        print_help();
        break;

    case 2:
        print_market_stats();
        break;

    case 3:
        make_offer();
        break;

    case 4:
        make_bid();
        break;

    case 5:
        print_wallet();
        break;

    case 6:
        time_skip();
        break;

    default:
        warning();
        break;
    };
}

/** Creates menu and returns map obj */
std::map<int, void (*)()> create_menu()
{
    // store menu in data structure
    std::map<int, void (*)()> menu;
    menu[1] = print_help;
    menu[2] = print_market_stats;
    menu[3] = make_offer;
    menu[4] = make_bid;
    menu[5] = print_wallet;
    menu[6] = time_skip;

    return menu;
}

int main()
{
    welcome();

    std::map<int, void (*)()> menu = create_menu();

    // Make a game repeat itself
    while (true)
    {
        print_menu();
        int user_option = get_user_option();
        // process_user_option(user_option);

        menu[user_option]();
    }

    return 0;
}