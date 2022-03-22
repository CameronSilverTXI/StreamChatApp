/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ChannelList, Chat, OverlayProvider} from 'stream-chat-react-native';
import {StreamChat, Channel as ClientChannel} from 'stream-chat';
import Conversation from './Conversation';
import Config from 'react-native-config';

const client = StreamChat.getInstance('s7h4yu5nvt8s');

type UserConnectState = 'disconnected' | 'connecting' | 'connected';

const MainContent: React.FC = () => {
  const [chatChannel, setChatChannel] = useState<ClientChannel | undefined>();

  const filters = {
    type: 'messaging',
    members: {$in: [Config.STREAM_CHAT_USER_ID]},
    community: 'fbc',
  };
  const sort = {last_message_at: -1};
  const options = {limit: 20, messages_limit: 30};

  if (!chatChannel) {
    return (
      <ChannelList
        filters={filters}
        sort={sort}
        options={options}
        onSelect={channel => {
          setChatChannel(channel);
        }}
      />
    );
  } else {
    return (
      <Conversation
        channel={chatChannel}
        onChannelExit={() => setChatChannel(undefined)}
      />
    );
  }
};

const App = () => {
  const [userConnectState, setUserConnectState] =
    useState<UserConnectState>('disconnected');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const connectUser = async () => {
    setUserConnectState('connecting');
    console.log('Attempting to connect the user');
    await client.connectUser(
      {id: Config.STREAM_CHAT_USER_ID},
      Config.STREAM_CHAT_TOKEN,
    );
    console.log('Connected the user!');
    setUserConnectState('connected');
  };

  if (userConnectState === 'disconnected') {
    connectUser();
  }

  console.log('render!');

  return (
    <SafeAreaView style={backgroundStyle}>
      <OverlayProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          style={{
            height: '100%',
          }}>
          {userConnectState === 'connected' && (
            <Chat client={client}>
              <MainContent />
            </Chat>
          )}
        </View>
      </OverlayProvider>
    </SafeAreaView>
  );

  /*
  return (
    <GestureHandlerRootView>
      <OverlayProvider>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <View style={{flex: 1, backgroundColor: 'red', height: '100%'}}>
            <Text>Boop</Text>
            {userConnectState === 'connected' && (
              <>
                <Chat client={client}>
                  <ChannelList filters={filters} sort={sort} />
                </Chat>
              </>
            )}
          </View>
        </SafeAreaView>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
    */
};

export default App;
