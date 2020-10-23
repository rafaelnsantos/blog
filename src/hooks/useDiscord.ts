interface DiscordMessage {
  username: string;
  message: string;
}

export const useDiscord = (webhook: string) => {
  const sendMessage = ({ username, message }: DiscordMessage) =>
    fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: `${username}`,
        content: `${message}`,
      }),
    });

  return sendMessage;
};
