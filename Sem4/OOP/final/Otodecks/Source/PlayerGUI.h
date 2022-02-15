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
                    public juce::FileDragAndDropTarget,
                    private juce::Timer
{
public:
    PlayerGUI(Player* player,
              Waveform* waveform);
    ~PlayerGUI() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Override pure virtual functions from the FileDragAndDropTarget base class
    virtual bool isInterestedInFileDrag(const juce::StringArray& files) override;
    virtual void filesDropped(const juce::StringArray& files, int x, int y) override;

    // Override pure virtual functions from the ChangeListener base class
    virtual void changeListenerCallback(juce::ChangeBroadcaster* source) override;




private:

    // Callback function for the play button
    void playBtnClick() const;
    // Callback function for the stop button
    void stopBtnClick();
    // Callback function for the open button
    void openBtnClick();
    // Callback function for the loop button
    void loopBtnClick();

    // Successfull file load callback
    void fileLoaded(juce::File file);


    // Callback function for the hotQue
    void queEditClick();
    // Callback function for the hotQue
    void hotQueClick(juce::TextButton* btnAddr) const;

    // Toggle off all hot que btns
    void queBtnsOff();

    // Callback function for the gain slider
    void gainSldChange() const;
    // Callback function for the time slider
    void timeSldChange() const;
    // Callback function for the tempo slider
    void tempoSldChange() const;

    // Logic behind changes of transport source
    void transpChange(juce::AudioTransportSource* transpSrcP);

    // Logic behind changes of thumbnail
    void thumbChange();

    // Start btn
    juce::TextButton playBtn;

    // Stop btn
    juce::TextButton stopBtn;

    // Open btn
    juce::TextButton openBtn{ "Open file" };
    
    // Loop btn
    //juce::ToggleButton loopBtn{ "Loop file" };                              // DELETE!
    juce::TextButton loopBtn{ "Loop file" };                              // DELETE!

    // Hot que edit mode
    juce::TextButton queEditBtn{ "Edit hot ques" };

    // Hot que btns
    juce::TextButton Que1Btn{ "1" };
    juce::TextButton Que2Btn{ "2" };
    juce::TextButton Que3Btn{ "3" };
    juce::TextButton Que4Btn{ "4" };
    juce::TextButton Que5Btn{ "5" };
    juce::TextButton Que6Btn{ "6" };
    juce::TextButton Que7Btn{ "7" };
    juce::TextButton Que8Btn{ "8" };

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

    // Override pure virtual functions from the Timer base class
    virtual void timerCallback() override;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PlayerGUI)
};
