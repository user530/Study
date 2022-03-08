/*
  ==============================================================================

    DynamicWaveform.cpp
    Created: 6 Mar 2022 2:43:07pm
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "DynamicWaveform.h"

//==============================================================================
DynamicWaveform::DynamicWaveform() : audioThumb(nullptr), 
                                        curTime(0.0),
                                        visibleRange(juce::Range<double>{}),
                                        visibleTimeSpread(20)
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs
}

DynamicWaveform::~DynamicWaveform()
{
}

void DynamicWaveform::paint (juce::Graphics& g)
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
    g.drawText ("DynamicWaveform", getLocalBounds(),
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

void DynamicWaveform::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..

}


void DynamicWaveform::paintIfLoaded(juce::Graphics& g)
{

    // Background color
    g.setColour(
        getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId)
    );

    // Fill background
    g.fillRect(getLocalBounds());
    // Waveform color
    g.setColour(juce::Colours::lawngreen);
    // Set waveform opacity
    g.setOpacity(0.8);

    // Visible range start value
    const double rangeStart = visibleRange.getStart();

    // Visible range end value
    const double rangeEnd = visibleRange.getEnd();

    // Draw 'local' waveform for the current position
    audioThumb->drawChannel(g,
                            getLocalBounds(),
                            rangeStart,
                            rangeEnd,
                            0,
                            1.0f);

    // Playhead color
    g.setColour(juce::Colours::red);

    g.setOpacity(1);

    // Draw the playhead for the dinamic waveform
    g.drawRect((float)getWidth() / 2 - 1.0,
                    0.0,
                    1.0f,
                    (float)getHeight(),
                    2.0f);

    // Bars color
    g.setColour(juce::Colours::white);

    // Scale in pix/sec
    float scale = getWidth() / visibleRange.getLength();

    // Iterate over visible range
    for (int i = std::ceil(rangeStart);
        i <= std::floor(rangeEnd);
        ++i)
    {
        // Time to the next whole second (in seconds)
        double dSec = i - rangeStart;

        // Draw bar based on the scale
        g.drawRect(dSec * scale - 1,
                    i%4 == 0 ? 0 : (float)getHeight() * 0.25,
                    1.0f,
                    i%4 == 0 ? getHeight() : (float)getHeight() * 0.5,
                    2.0f);
    }


};


void DynamicWaveform::paintIfEmpty(juce::Graphics& g)
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
    g.drawFittedText("NO WAVEFORM DETECTED", getLocalBounds(), juce::Justification::centred, 1);
};

// Set audio thumb to draw waveforms
void DynamicWaveform::setAudioThumb(juce::AudioThumbnail* newAudioThumb)
{
    if (audioThumb != newAudioThumb)
        audioThumb = newAudioThumb;
};

// Set current time
void DynamicWaveform::setCurTime(const double newTime)
{
    if (curTime != newTime)
        curTime = newTime;
};

// Set new visible range
void DynamicWaveform::setVisRange(juce::Range<double> newRange)
{
    // Set new visible range
    visibleRange = newRange;
};

// Update range based on the new track
void DynamicWaveform::initRange()
{
    setVisRange(juce::Range<double>{0.0,
                                    audioThumb->getTotalLength()});
};

// Update visible range
void DynamicWaveform::updateVisRange()
{
    // Update new visual range
    setVisRange(juce::Range<double>{curTime - visibleTimeSpread / 2,
                                    curTime + visibleTimeSpread / 2});

};