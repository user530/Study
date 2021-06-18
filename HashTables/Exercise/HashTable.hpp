#ifndef HASHTABLE_HPP
#define HASHTABLE_HPP

class HashTable
{
public:
  HashTable(long, long, long);
  ~HashTable();
  void insert(int);
  void extend();
  bool find(int);
  void remove(int);
  double loadFactor();
};

#endif
