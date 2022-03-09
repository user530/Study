/*
  ==============================================================================

    StaticWaveform.cpp
    Created: 6 Mar 2022 2:42:25pm
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "StaticWaveform.h"

//==============================================================================
StaticWaveform::StaticWaveform() : audioThumb(nullptr),
                                    curTime(0.0),
                                    curPos(0.0),
                                    trackName(""),
                                    trackLength(""),
                                    timeString("")
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.

}

StaticWaveform::~StaticWaveform()
{
}

void StaticWaveform::paint (juce::Graphics& g)
{
    /* This demo code just fills the component's background and
       draws some placeholder text to get you started.

       You should replace everything in this method with your own
       drawing code..
    */

    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));   // clear the background

    g.setColour (juce::Colours::grey);
    g.drawRect (getLocalBounds(), 1);   // draw an outline around the component

    g.setColour (juce::Colours::white);
    g.setFont (14.0f);
    g.drawText ("StaticWaveform", getLocalBounds(),
                juce::Justification::centred, true);   // draw some placeholder text

    // If file not loaded
    if (audioThumb == nullptr)
    {
        // Callback for empty thumbnail
        paintIfEmpty(g);
    }
    // If loaded
    else
    {
        // Callback to draw waveform
        paintIfLoaded(g);
    }

    // Draw an outline around the component
    g.setColour(juce::Colours::grey);
    g.drawRect(getLocalBounds(), 1);
}

void StaticWaveform::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..

}

// Set audio thumb to draw waveforms
void StaticWaveform::setAudioThumb(juce::AudioThumbnail* newAudioThumb)
{
    if (audioThumb != newAudioThumb)
        audioThumb = newAudioThumb; 
};


// Set current time
void StaticWaveform::setCurTime(const double newTime)
{
    if (curTime != newTime)
        curTime = newTime;
};


// Set current position
void StaticWaveform::setCurPos(const double newPos)
{
    if (curPos != newPos)
        curPos = newPos;
};

// Set track name
void StaticWaveform::setTrackName(const juce::String newTrackName)
{
    if (trackName != newTrackName)
        trackName = newTrackName;
};

// Set track length
void StaticWaveform::setTrackLength(const int maxLen)
{
    // Set track length
    trackLength = juce::String((int)(maxLen / 60)) + ":" + juce::String(maxLen % 60);
};

// Return playback time as a string
const juce::String StaticWaveform::getTimeString(const double curTime) const
{
    // Prepare current time
    juce::String trackCur = juce::String{ (int)(curTime / 60) } + ":" + juce::String((int)curTime % 60);

    // Construct timer string
    return trackCur + " / " + trackLength;
};

void StaticWaveform::paintIfLoaded(juce::Graphics& g)
{
    // Background color
    g.setColour(
        getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId)
    );

    // Fill background
    g.fillRect(getLocalBounds());

    // Waveform color
    g.setColour(juce::Colours::lawngreen);

    // Draw static waveform for the whole track
    audioThumb->drawChannel(g,
                            juce::Rectangle<int>{ 0,getHeight() / 2, getWidth(), getHeight() },
                            0.0,
                            audioThumb->getTotalLength(),
                            0,
                            1.0f);

    // Calculate position on the screen
    float absPos = curPos * getWidth();

    // Playhead color
    g.setColour(juce::Colours::red);


    // Draw the playhead for static waveform
    g.drawRect(absPos,
                (float)getHeight() * 0.5,
                1.0f,
                (float)getHeight());

    // Text color
    g.setColour(juce::Colours::red);

    // Set font size
    g.setFont(28.0f);

    // Draw Song name and 
    g.drawFittedText(trackName + "  -   " + getTimeString(curTime),
                        juce::Rectangle<int>(0, 0, getWidth(), getHeight() * 0.5),
                        juce::Justification::centred, 
                        1);
    
};


void StaticWaveform::paintIfEmpty(juce::Graphics& g)
{
    // Background color
    g.setColour(
        // Background color
        getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId)
    );

    // Fill background
    g.fillRect(getLocalBounds());
    // Text color
    g.setColour(juce::Colours::lawngreen);
    // Set font size
    g.setFont(28.0f);
    // Print text   
    g.drawFittedText("NO TRACK LOADED", getLocalBounds(), juce::Justification::centred, 1);
};

