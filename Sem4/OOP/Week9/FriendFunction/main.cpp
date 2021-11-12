#include <iostream>
#include <memory>
#include <string>
#include "box.h"

const double Box::volume()
{
    return length * width * height;
};

double surfaceArea(const Box &aBox)
{
    return 2 * (aBox.length * aBox.width + aBox.length * aBox.height + aBox.width * aBox.height);
}

int main()
{
    Box box1{2.2, 1.1, 0.5};                            // An arbitrary box
    Box box2;                                           // A default box
    auto box3 = std::make_unique<Box>(15.0, 20.0, 8.0); // Dynamically allocated box

    std::cout << "Volume of box1 = " << box1.volume() << std::endl;
    std::cout << "Surface Area of box1 = " << surfaceArea(box1) << std::endl;
    std::cout << "Volume of box2 = " << box2.volume() << std::endl;
    std::cout << "Surface Area of box2 = " << surfaceArea(box2) << std::endl;
    std::cout << "Volume of box3 = " << box3->volume() << std::endl;
    std::cout << "Surface Area of box3 = " << surfaceArea(*box3) << std::endl;

    return 0;
}