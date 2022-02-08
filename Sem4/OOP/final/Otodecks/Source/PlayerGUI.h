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

//==============================================================================
/*
*/
class PlayerGUI  : public juce::Component,
                    public juce::ChangeListener,
                    public juce::FileDragAndDropTarget
{
public:
    PlayerGUI(Player* player);
    ~PlayerGUI() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Override pure virtual functions from the FileDragAndDropTarget parent class
    virtual bool isInterestedInFileDrag(const juce::StringArray& files) override;
    virtual void filesDropped(const juce::StringArray& files, int x, int y) override;

    // Override pure virtual functions from the ChangeListener parent class
    virtual void changeListenerCallback(juce::ChangeBroadcaster* source) override;



private:

    void playBtnClick();
    void stopBtnClick();
    void openBtnClick();


    // Start btn
    juce::TextButton playBtn;

    // Stop btn
    juce::TextButton stopBtn;

    // Open btn
    juce::TextButton openBtn;

    // Connect player
    Player* player;

    // File chooser                 - DELETE LATER!
    std::unique_ptr<juce::FileChooser> chooser;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PlayerGUI)
};
