#include <iostream>
#include <string>

class Box
{
private:
    double length{1};
    double width{1};
    double height{1};

public:
    // Constructor
    Box(double _length, double _width, double _height)
        : length(_length), width(_width), height(_height){};

    Box() = default;

    // Accessors
    double getWidth() const
    {
        return width;
    }

    double getLength() const
    {
        return length;
    }

    double getHeight() const
    {
        return height;
    }

    // Calculate the volume
    double volume() const
    {
        return length * width * height;
    };

    // Overloading "less-then" operator
    bool operator<(const Box &aBox) const
    {
        return volume() < aBox.volume();
    }
};

int main()
{
    Box myFirstBox{10, 4, 5};
    double v = myFirstBox.volume();
    std::cout << "First box volume is - " << v << std::endl;

    Box mySecondBox;
    std::cout << "Second box volume is - " << mySecondBox.volume() << std::endl;

    std::cout << std::boolalpha
              << "Is the first box smaller than the second one? "
              << (myFirstBox < mySecondBox)
              << std::endl;
    return 0;
}