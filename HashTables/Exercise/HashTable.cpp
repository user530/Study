#include "HashTable.hpp"
#include <iostream>
using namespace std;

HashTable::HashTable(long _a, long _c, long _m)
{
  int a = _a, c = _c, m = _m;
  int *buckets = new int[m];
  *buckets = a;
  *(buckets + 1) = c;
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
  return 0;
}
