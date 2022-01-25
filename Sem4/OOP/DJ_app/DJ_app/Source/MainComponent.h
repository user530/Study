#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
    This component lives inside our window, and this is where you should put all
    your controls and content.
*/
class MainComponent  : public juce::AudioAppComponent,
                       public juce::Button::Listener,
                       public juce::Slider::Listener
{
public:
    //==============================================================================
    MainComponent();
    ~MainComponent() override;

    //==============================================================================
    void prepareToPlay (int samplesPerBlockExpected, double sampleRate) override;
    void getNextAudioBlock (const juce::AudioSourceChannelInfo& bufferToFill) override;
    void releaseResources() override;

    //==============================================================================
    void paint (juce::Graphics& g) override;
    void resized() override;

    //==============================================================================
    /** Implement Button::Listener */
    void buttonClicked(juce::Button*) override;
    
    /** Implement Slider::Listener */
    void sliderValueChanged(juce::Slider*) override;

private:
    //==============================================================================
    // Your private member variables go here...
    juce::TextButton playButton{"PLAY"};
    juce::TextButton stopButton{"STOP"};
    juce::TextButton loadFile{ "LOAD FILE" };
    juce::Slider volSlider;
    juce::Slider speedSlider;
    juce::Slider timeSlider;

    // Helper variables
    juce::Random rng;

    // Controls
    bool playing;
    void setTime();
    void updateTime(double);

    // Sound
    double phase;       // Main phase (so there is no discontinuties between the different samples
    double dPhase;      // Phase difference
    double gain;        // Sound volume/gain
    double speed;       // Player speed
    double timestamp;   // Timestamp
    double songLen;     // Length of the song

    // File player
    juce::AudioFormatManager formatManager;                                 // Inner layer of file player
    std::unique_ptr<juce::AudioFormatReaderSource> readerSource;            // Mid layer of file player
    juce::AudioTransportSource transportSource;                             // Outer layer of file player
    juce::ResamplingAudioSource resampleSource{&transportSource, false};    // Transport source wrapper, allow playback speed alteration

    void loadURL(juce::URL);    // File loader


    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (MainComponent)
};
