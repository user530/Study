/*
  ==============================================================================

    DJAudioPlayer.cpp
    Created: 25 Jan 2022 2:27:51pm
    Author:  eosdu

  ==============================================================================
*/

#include "DJAudioPlayer.h"

DJAudioPlayer::DJAudioPlayer(){};
DJAudioPlayer::~DJAudioPlayer(){};

//AudioSourceInterface==================================================

void DJAudioPlayer::prepareToPlay(int samplesPerBlockExpected, double sampleRate){
    // Register formats
    formatManager.registerBasicFormats();

    // Pass the job to the transport layer
    transportSource.prepareToPlay(sampleRate, sampleRate);

    // Also, pass to the wrapper
    resampleSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
};
void DJAudioPlayer::getNextAudioBlock(const juce::AudioSourceChannelInfo& bufferToFill){
    // Pass the job to the transport layer
    resampleSource.getNextAudioBlock(bufferToFill);
};
void DJAudioPlayer::releaseResources(){
    // Pass the job to the transport layer
    transportSource.releaseResources();
};

//======================================================================

void DJAudioPlayer::loadURL(juce::URL audioURL){
    // Convert URL into input stream and Create reader from the input stream
    auto* reader = formatManager.createReaderFor(audioURL.createInputStream(false));
    // Check that file converted successfully
    if (reader == nullptr)
    {
        DBG("FAILED TO LOAD AUDIO FILE!");
    }
    if (reader != nullptr)
    {
        // Create source from the converted Reader
        std::unique_ptr<juce::AudioFormatReaderSource> newSource(new juce::AudioFormatReaderSource(reader, false));
        // Create transport source from the ReaderSource
        transportSource.setSource(newSource.get(), 0, nullptr, reader->sampleRate);
        /* Unique pointers are unique, so only one item can use them
           If there is a problem with creating FormatReaderSource ->
           local variable will cease to exist and release memory when function ends
           But if everything is ok, we need to transfer pointer to the class scope variable  */
        readerSource.reset(newSource.release());
    }
};
void DJAudioPlayer::setGain(double gain){
    // Set volume 
    transportSource.setGain(gain);
};
void DJAudioPlayer::setSpeed(double ratio){
    // Set speed
    resampleSource.setResamplingRatio(ratio);
};
void DJAudioPlayer::setPosition(double posInSecs){
    // Set position 
    transportSource.setPosition(posInSecs);
};


void DJAudioPlayer::start(){
    // Set position to the start
    transportSource.setPosition(0.0);
    // Start the player
    transportSource.start();
};
void DJAudioPlayer::stop(){
    // Stop the player
    transportSource.stop();
};