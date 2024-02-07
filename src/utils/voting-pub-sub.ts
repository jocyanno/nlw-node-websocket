type Message = { pollOptionId: string, votes: number };
type Subscripe = (message: Message) => void;

class VotingPubSub {
  publish(pollId: string, arg1: { pollOptionId: any; votes: number; }) {
    throw new Error("Method not implemented.");
  }
  private channels: Record<string, Subscripe[]> = {};

  subscribe(pollId: string, subscriber: Subscripe) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }

    this.channels[pollId].push(subscriber);
  }

  public(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message);
    }
  }
}

export const voting = new VotingPubSub();