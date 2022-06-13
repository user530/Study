#include <iostream>


class Log
{
public:
	const int LogLevelError = 0;
	const int LogLevelWarning = 1;
	const int LogLevelInfo = 2;

private:
	int m_logLevel = LogLevelInfo;

public:
	void setLevel(int level)
	{
		m_logLevel = level;
	}

	void error(const char* msg)
	{
		if(m_logLevel >= LogLevelError)
			std::cout << "[ERROR]: " << msg << std::endl;
	}

	void warn(const char* msg)
	{
		if (m_logLevel >= LogLevelWarning)
			std::cout << "[WARNING]: " << msg << std::endl;
	}

	void info(const char* msg)
	{
		if (m_logLevel >= LogLevelInfo)
			std::cout << "[INFO]: " << msg << std::endl;
	}
};

enum Example
{
	A, B, C
};

int main()
{

	/*Log log;
	log.setLevel(log.LogLevelWarning);
	log.warn("Hello!");*/

 	std::cin.get();
}

