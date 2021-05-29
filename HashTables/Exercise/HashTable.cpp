#include <iostream>
#include "HashTable.hpp"

HashTable::HashTable(long _a, long _c, long _m)
{
  this->a = _a;
  this->c = _c;
  this->m = _m;
}

long HashTable::get_a()
{
  return this->a;
}

long HashTable::get_c()
{
  return this->c;
}

long HashTable::get_m()
{
  return this->m;
}

HashTable::~HashTable()
{
}

void HashTable::insert(int key)
{
}

void HashTable::extend()
{
}

bool HashTable::find(int key)
{
  return false;
}

void HashTable::remove(int key)
{
}

double HashTable::loadFactor()
{
  return 0.0;
}

int main()
{
  HashTable table1(1, 2, 3);

  int test = 5;
  int *arr = new int[test];

  for (int i = 0; i < test; ++i)
  {
    std::cout << arr[i]
              << "\n"
              << std::endl;
  }

  return 1;
}