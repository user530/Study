/*
  ==============================================================================

    WaveformDisplay.cpp
    Created: 26 Jan 2022 6:33:06pm
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "WaveformDisplay.h"

//==============================================================================
WaveformDisplay::WaveformDisplay(juce::AudioFormatManager& formatManagerToUse,
                                 juce::AudioThumbnailCache& cacheToUse) 
                                 : audioThumb{1000, formatManagerToUse , cacheToUse},
                                   fileLoaded{ false },
                                   position(0.0)
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.
        
    // Add change listener to audioThumb
    audioThumb.addChangeListener(this);
}

WaveformDisplay::~WaveformDisplay()
{
}

void WaveformDisplay::paint (juce::Graphics& g)
{
    /* This demo code just fills the component's background and
       draws some placeholder text to get you started.

       You should replace everything in this method with your own
       drawing code..
    */

    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));   // clear the background

    g.setColour (juce::Colours::grey);
    g.drawRect (getLocalBounds(), 1);   // draw an outline around the component

    g.setColour (juce::Colours::orange);

    // If file is loaded
    if (fileLoaded)
    {
        // Draw a waveform
        audioThumb.drawChannel(g, getLocalBounds(), 0,
                                audioThumb.getTotalLength(), 0, 1.0f );

        // Draw a playhead rect
        g.setColour(juce::Colours::lightgreen);
        g.drawRect(position * getWidth(), 0,
                   getWidth() / 20, getHeight());
    }
    // If there is no file
    else 
    {
        // Show status message
        g.setFont (20.0f);
        g.drawText ("FILE NOT LOADED YET", getLocalBounds(),
                    juce::Justification::centred, true);   // draw some placeholder text
    }
}

void WaveformDisplay::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..

}

void WaveformDisplay::loadURL(juce::URL fileURL)
{
    DBG("LoadURL - Fired!");
    // Clear source
    audioThumb.clear();
    // Try to load
    fileLoaded = audioThumb.setSource(new juce::URLInputSource(fileURL));
}

void WaveformDisplay::changeListenerCallback(juce::ChangeBroadcaster* source)
{
    DBG("CHANGE LISTENER FIRED!");
    repaint();
};

void WaveformDisplay::setPositionRelative(double relativePosition)
{
    // If position is changed 
    if (position != relativePosition)
    {
        // Set new position
        position = relativePosition;
        repaint();
    }
};
