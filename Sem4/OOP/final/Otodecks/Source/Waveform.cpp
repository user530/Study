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
                   juce::AudioThumbnailCache& thumbCacheAdr,
                                StaticWaveform* _statWaveform,
                                DynamicWaveform* _dynWaveform) :
                                                                audioThumb(1024,
                                                                           formatManagerAdr,
                                                                           thumbCacheAdr),
                                                                statWaveform(_statWaveform),
                                                                dynWaveform(_dynWaveform),
                                                                curPos(0.0),
                                                                curTime(0.0)
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

}

void Waveform::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..

}



// Update waveforms
void Waveform::updateWaveforms()
{
    // Set new time
    statWaveform->setCurTime(curTime);
    dynWaveform->setCurTime(curTime);

    // Set new position for the static waveform playhead
    statWaveform->setCurPos(curPos);

    // Update visuals
    statWaveform->repaint();
    dynWaveform->repaint();
};

// Set new audio thumb to the static and dynamic audio thumb
void Waveform::setNewThumb()
{
    // Pass audio thumb address to the static waveform
    statWaveform->setAudioThumb(&audioThumb);

    // Pass audio thumb address to the dynamic waveform
    dynWaveform->setAudioThumb(&audioThumb);

    // Initialize dynamic range
    dynWaveform->initRange();
};

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
    }
};

// Set track name
void Waveform::setTrackName(const juce::String name)
{
    // Pass the job to the static waveform
    statWaveform->setTrackName(name);
};

// Update visible range
void Waveform::updateVisRange()
{
    // Pass the job to the dynamic waveform
    dynWaveform->updateVisRange();

    // Update visuals
    updateWaveforms();                                                       
};

// Set track length
void Waveform::setTrackLength(const int maxLen) 
{
    // Pass the job to the static waveform
    statWaveform->setTrackLength(maxLen);
};


// Set current time
void Waveform::setCurTime(const double newTime)
{
    // If time changed
    if (curTime != newTime)
    {
        // Set new time
        curTime = newTime;
    }
};