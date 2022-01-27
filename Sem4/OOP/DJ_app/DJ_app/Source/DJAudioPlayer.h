/*
  ==============================================================================

    DJAudioPlayer.h
    Created: 25 Jan 2022 2:27:51pm
    Author:  eosdu

  ==============================================================================
*/

#pragma once
#include <JuceHeader.h>

class DJAudioPlayer: public juce::AudioSource{
    public:
        DJAudioPlayer(juce::AudioFormatManager& formatManager);
        ~DJAudioPlayer();

        //AudioSourceInterface==================================================
        void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override;
        void getNextAudioBlock(const juce::AudioSourceChannelInfo& bufferToFill) override;
        void releaseResources() override;

        void loadURL(juce::URL audioURL);
        void setGain(double gain);
        void setSpeed(double ratio);
        void setPosition(double posInSecs);
        void setPositionRelative(double pos);

        void start();
        void stop();

        // Control variable
        bool playing;

        // Get relative playhead position
        double getPositionRelative() const;

    private:
        juce::AudioFormatManager& formatManager;
        std::unique_ptr<juce::AudioFormatReaderSource> readerSource;
        juce::AudioTransportSource transportSource;
        juce::ResamplingAudioSource resampleSource{&transportSource, false};
};