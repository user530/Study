#include "HashTable.hpp"
#include <iostream>
using namespace std;

HashTable::HashTable(long _a, long _c, long _m)
{
  a = _a, c = _c;
  int m = _m;
  buckets = new int[m];
  *(buckets) = 1;
  *(buckets + 2) = 3;

  for (int i = 0; i < m; ++i)
  {
    std::cout << *(buckets + i) << "\n";
  }
}

HashTable::~HashTable()
{
  delete[] buckets;
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
  HashTable htable(1, 0, 3);
  return 0;
}
