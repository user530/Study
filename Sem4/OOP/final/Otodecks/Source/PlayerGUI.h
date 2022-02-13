/*
  ==============================================================================

    PlayerGUI.h
    Created: 4 Feb 2022 11:57:30am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>
#include "Player.h"
#include "Waveform.h"

//==============================================================================
/*
*/
class PlayerGUI  : public juce::Component,
                    public juce::ChangeListener,
                    public juce::FileDragAndDropTarget
{
public:
    PlayerGUI(Player* player,
              Waveform* waveform);
    ~PlayerGUI() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Override pure virtual functions from the FileDragAndDropTarget parent class
    virtual bool isInterestedInFileDrag(const juce::StringArray& files) override;
    virtual void filesDropped(const juce::StringArray& files, int x, int y) override;

    // Override pure virtual functions from the ChangeListener parent class
    virtual void changeListenerCallback(juce::ChangeBroadcaster* source) override;



private:

    // Callback function for the play button
    void playBtnClick() const;
    // Callback function for the stop button
    void stopBtnClick();
    // Callback function for the open button
    void openBtnClick();
    // Callback function for the loop button
    void loopBtnClick() const;

    // Callback function for the gain slider
    void gainSldChange() const;
    // Callback function for the time slider
    void timeSldChange() const;
    // Callback function for the tempo slider
    void tempoSldChange() const;

    // Logic behind changes of transport source
    void transpChange(juce::AudioTransportSource* transpSrcP);

    // Logic behind changes of thumbnail
    void thumbChange(juce::AudioThumbnail* thumbP);

    // Start btn
    juce::TextButton playBtn;

    // Stop btn
    juce::TextButton stopBtn;

    // Open btn
    juce::TextButton openBtn;
    
    // Loop btn
    juce::ToggleButton loopBtn;

    // Gain slider
    juce::Slider gainSld;

    // Time slider
    juce::Slider timeSld;
    
    // Tempo slider
    juce::Slider tempoSld;

    // Connect player
    Player* player;

    // Connect waveform display
    Waveform* waveform;

    // File chooser                 - DELETE LATER!
    std::unique_ptr<juce::FileChooser> chooser;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PlayerGUI)
};
