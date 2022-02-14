/*
  ==============================================================================

    Waveform.cpp
    Created: 4 Feb 2022 11:57:59am
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "Waveform.h"

//==============================================================================
Waveform::Waveform(juce::AudioFormatManager& formatManagerAdr,
                   juce::AudioThumbnailCache& thumbCacheAdr) : 
                                                                audioThumb(1024,
                                                                           formatManagerAdr,
                                                                           thumbCacheAdr),
                                                                curPos(0.0)
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.
}

Waveform::~Waveform()
{
}

void Waveform::paint (juce::Graphics& g)
{
    /* This demo code just fills the component's background and
       draws some placeholder text to get you started.

       You should replace everything in this method with your own
       drawing code..
    */

    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));   // clear the background

    g.setColour (juce::Colours::white);
    g.setFont (14.0f);
    g.drawText ("Waveform", getLocalBounds(),
                juce::Justification::centred, true);   // draw some placeholder text

    // If file not loaded
    if (audioThumb.getNumChannels() == 0)
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

// Paint helper functions
void Waveform::paintIfLoaded(juce::Graphics& g)
{
    // Background color
    g.setColour(bgCol);
    // Fill background
    g.fillRect(getLocalBounds());
    // Waveform color
    g.setColour(juce::Colours::lawngreen);

    // Draw waveform
    audioThumb.drawChannel(g, getLocalBounds(),
                            0.0, audioThumb.getTotalLength(), 0, 1.0f);

    // Playhead color
    g.setColour(juce::Colours::red);

    // Calculate position on the screen
    float absPos = curPos * getWidth();

    // Draw the playhead
    g.drawRect(absPos, 0.0f, 1.0f, (float)getHeight());
    
};

void Waveform::paintIfEmpty(juce::Graphics& g)
{
    // Background color
    g.setColour(bgCol);
    // Fill background
    g.fillRect(getLocalBounds());
    // Text color
    g.setColour(juce::Colours::lawngreen);
    // Set font size
    g.setFont(28.0f);
    // Print text   
    g.drawFittedText("NO WAVEFORM DETECTED!", getLocalBounds(), juce::Justification::centred, 1);
};

void Waveform::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..

}

// Get access to the audio thumbnail, so GUI can attach listener
juce::AudioThumbnail* Waveform::getAudioThumb()
{
    return &audioThumb;
};

void Waveform::setRelPos(double relPos)
{
    // If relative position is differs from the current one
    if (curPos != relPos)
    {
        // Update position
        curPos = relPos;
        // Redraw waveform
        repaint();
    }
};