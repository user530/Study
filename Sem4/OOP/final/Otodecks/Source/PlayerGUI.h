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
#include "Library.h"

//==============================================================================
/*
*/
class PlayerGUI  : public juce::Component,
                    public juce::ChangeListener,
                    public juce::FileDragAndDropTarget,
                    public juce::DragAndDropTarget,
                    private juce::Timer
{
public:
    PlayerGUI(Player* player,
              Waveform* waveform,
              Library* library);
    ~PlayerGUI() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Override pure virtual functions from the FileDragAndDropTarget base class
    virtual bool isInterestedInFileDrag(const juce::StringArray& files) override;
    virtual void filesDropped(const juce::StringArray& files, int x, int y) override;

    // Override pure virtual functions from the DragAndDropTarget base class
    virtual bool isInterestedInDragSource(const SourceDetails& dragSourceDetails) override;
    virtual void itemDropped(const SourceDetails& dragSourceDetails) override;
    virtual bool shouldDrawDragImageWhenOver() override;

    // Override pure virtual functions from the ChangeListener base class
    virtual void changeListenerCallback(juce::ChangeBroadcaster* source) override;




private:

    // Callback function for the play button
    void playBtnClick() const;
    // Callback function for the stop button
    void stopBtnClick();
    // Callback function for the open button                                                    // DELETE
    void openBtnClick();
    // Callback function for the load button
    void loadBtnClick();


    // Callback function for the loop button
    void loopBtnClick();

    // Successfull file load callback
    void fileLoaded(juce::File file, juce::String trackName);

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

    // Load from lib
    juce::TextButton loadBtn{ "Load selected" };
    
    // Loop btn
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

    // Connect library
    Library* library;

    // File chooser                 - DELETE LATER!
    std::unique_ptr<juce::FileChooser> chooser;

    // Override pure virtual functions from the Timer base class
    virtual void timerCallback() override;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PlayerGUI)
};
