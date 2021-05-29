#ifndef HASHTABLE_HPP
#define HASHTABLE_HPP

class HashTable
{
private:
  long a, c, m;

public: // for testing purposes
  int *buckets = 0;

public:
  HashTable(long, long, long);
  ~HashTable();
  void insert(int);
  void extend();
  bool find(int);
  void remove(int);
  double loadFactor();
  long get_a();
  long get_c();
  long get_m();
};
#endif
