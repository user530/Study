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
                                                                curPos(0.0),
                                                                trackName(""),
                                                                trackLength(""),
                                                                curTime(0.0)
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.

    // Setup initial visible range
    visibleRange.setStart(0.0);
    visibleRange.setEnd(audioThumb.getTotalLength());
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

    // Separate each bounding rect into 2 parts
    juce::Rectangle<int> rect1 = getLocalBounds()
                                    .removeFromTop(getHeight()/2);
    juce::Rectangle<int> rect2 = getLocalBounds()
                                    .removeFromBottom(getHeight()/2);

    // Make second rect bigger, to "hide" lower half of the waveform
    rect2.setHeight(rect2.getHeight() * 2);
    

    // Draw static waveform for the whole track
    /*audioThumb.drawChannel(g, 
                            rect2,
                            0.0, 
                            audioThumb.getTotalLength(),
                            0, 
                            1.0f);*/

    // Draw 'local' waveform for the current position
    audioThumb.drawChannel(g, 
                            //rect1,
                            getLocalBounds(),
                            visibleRange.getStart() - 5,
                            visibleRange.getEnd() + 5,
                            0, 
                            1.0f);

    // Playhead color
    g.setColour(juce::Colours::red);

    // Draw the playhead for the dinamic waveform
    g.drawRect((float)getWidth()/2 - 1.0,
                0.0,
                1.0f,
                (float)getHeight(),
                2.0f);
    
    // Bars color
    g.setColour(juce::Colours::white);

    // Scale
    float scale = getWidth() / visibleRange.getLength();

    // Iterate over visible range
    for (int i = std::ceil(visibleRange.getStart()); 
            i <= std::floor(visibleRange.getEnd()); 
                ++i)
    {
        // Range to the next bar (in seconds)
        double dSec = i - visibleRange.getStart();

        // Draw bar based on the scale
        g.drawRect(dSec * scale - 1, 0.0, 1.0f, (float)getHeight() / 2, 2.0f);
    }



    // Calculate position on the screen
    float absPos = curPos * getWidth();

    // Playhead color
    g.setColour(juce::Colours::red);


    // Draw the playhead for static waveform
    /*g.drawRect(absPos,
                (float)getHeight() * 0.5,
                1.0f,
                (float)getHeight());*/
    

    // Text color
    g.setColour(juce::Colours::yellow);

    // Set font size
    g.setFont(28.0f);

    // Draw Song name and 
    g.drawFittedText(trackName,
                        juce::Rectangle<int>(getWidth() * 0.25, 
                                                getHeight() * 0.4, 
                                                getWidth() * 0.25, 
                                                getHeight() * 0.2),
                        juce::Justification::centred,
                        2);

    // Draw playback time
    g.drawFittedText(getTimeString(curTime),
                        juce::Rectangle<int>(getWidth() * 0.5, 
                                                getHeight() * 0.4, 
                                                getWidth() * 0.25, 
                                                getHeight() * 0.2),
                        juce::Justification::centred,
                        1);

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
    }

    // Update visuals
    repaint();
};

// Set track name
void Waveform::setTrackName(const juce::String name)
{
    // Check that argument differs from the current name
    if (trackName != name)
    {
        // Set new name
        trackName = name;
    }
};

// Set new visible range
void Waveform::setVisRange(juce::Range<double> newRange)
{
    // Set new visible range
    visibleRange = newRange;
};


// Update visible range
void Waveform::updateVisRange()
{
    // Update new visual range
    setVisRange(juce::Range<double>(curTime - 5, curTime + 5));

    // Update visuals
    repaint();
};

// Set track length
void Waveform::setTrackLength(const int maxLen) 
{
    // Set track length
    trackLength = juce::String((int)(maxLen/60)) + ":" + juce::String(maxLen % 60);
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

// Show timer
const juce::String Waveform::getTimeString(const double curTime) const
{
    // Prepare current time
    juce::String trackCur = juce::String{ (int)(curTime / 60) } + ":" + juce::String((int)curTime % 60);

    // Construct timer string
    return trackCur + " / " + trackLength;
};

// Called when a mouse button is pressed
void Waveform::mouseDown(const juce::MouseEvent& e)
{
    DBG("MOUSE DOWN!");
};

// Called when a mouse button is released
void Waveform::mouseUp(const juce::MouseEvent& e)
{
    DBG("MOUSE UP!");
};

// Called when the mouse is moved while a button is held down
void Waveform::mouseDrag(const juce::MouseEvent& e)
{
    DBG("MOUSE DRAG!");
};