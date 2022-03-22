import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Channel as ClientChannel} from 'stream-chat';
import {
  Channel,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
} from 'stream-chat-react-native';

export type Props = {
  channel: ClientChannel<DefaultStreamChatGenerics>;
  onChannelExit: () => void;
};

const Conversation: React.FC<Props> = ({channel, onChannelExit}: Props) => {
  console.log(`Conversation with channel ID: ${channel.id}`);
  return (
    <View>
      <TouchableOpacity onPress={onChannelExit}>
        <View>
          <Text>Back To List</Text>
        </View>
      </TouchableOpacity>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </View>
  );
};

export default Conversation;
