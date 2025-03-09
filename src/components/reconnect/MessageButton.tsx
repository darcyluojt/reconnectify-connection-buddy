
import { useState } from 'react';
import { MessageCircle, Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface MessageButtonProps {
  name: string;
}

const MessageButton = ({ name }: MessageButtonProps) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendMessage = () => {
    setSending(true);
    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      setSent(true);
      toast.success(`Message sent to ${name}!`);
      setTimeout(() => {
        setSent(false);
      }, 3000);
    }, 1000);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="text-sm w-auto"
      onClick={handleSendMessage}
      disabled={sending || sent}
    >
      {sending ? (
        <>
          <RefreshCw size={14} className="mr-1 animate-spin" />
          Sending...
        </>
      ) : sent ? (
        <>
          <MessageCircle size={14} className="mr-1 text-green-500" />
          Sent!
        </>
      ) : (
        <>
          <Send size={14} className="mr-1" />
          Send
        </>
      )}
    </Button>
  );
};

export default MessageButton;
