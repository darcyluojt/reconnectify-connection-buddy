
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Copy, Check, Sparkles, Brush } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IcebreakerGeneratorProps {
  className?: string;
}

const toneOptions = [
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'professional', label: 'Professional' },
  { value: 'humorous', label: 'Humorous' }
];

const contextOptions = [
  { value: 'shared-interests', label: 'Shared Interests' },
  { value: 'recent-activity', label: 'Recent Activity' },
  { value: 'mutual-connections', label: 'Mutual Connections' },
  { value: 'past-conversations', label: 'Past Conversations' }
];

const exampleIcebreakers = [
  "Hey Sarah! I noticed you posted about hiking in Joshua Tree last weekend - that's one of my favorite spots too! How was the trail?",
  "Hi Jason, I saw we both follow that new coffee shop downtown. Have you tried their seasonal drinks yet? Been meaning to check it out!",
  "Alex! It's been ages since we caught up after that conference. I just saw your photo from Barcelona - looks amazing! How was your trip?",
  "Raj, I noticed we both liked that article about sustainable fashion. Have you discovered any good ethical brands lately?",
  "Emma! I see you're also into rock climbing now - when did that start? I've been thinking about trying it out at the new gym downtown."
];

const IcebreakerGenerator = ({ className }: IcebreakerGeneratorProps) => {
  const [icebreaker, setIcebreaker] = useState(exampleIcebreakers[0]);
  const [tone, setTone] = useState('friendly');
  const [context, setContext] = useState('recent-activity');
  const [length, setLength] = useState([50]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate API call to generate icebreaker
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * exampleIcebreakers.length);
      setIcebreaker(exampleIcebreakers[randomIndex]);
      setGenerating(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(icebreaker);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={cn("shadow-subtle overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-ohhey-blue/10 to-ohhey-light/70 border-b">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/20 text-primary border-none py-1 px-2">
            <Sparkles size={14} className="mr-1" />
            AI Powered
          </Badge>
        </div>
        <CardTitle className="text-xl">Icebreaker Generator</CardTitle>
        <CardDescription>
          Create personalized messages to reconnect with friends
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        <div className="bg-muted/40 rounded-lg p-4 relative">
          <Textarea
            value={icebreaker}
            onChange={(e) => setIcebreaker(e.target.value)}
            placeholder="Your icebreaker message will appear here..."
            className="min-h-[120px] resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Context</label>
            <Select value={context} onValueChange={setContext}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select context" />
              </SelectTrigger>
              <SelectContent>
                {contextOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Message Length</label>
            <span className="text-xs text-muted-foreground">{length[0]}%</span>
          </div>
          <Slider
            value={length}
            onValueChange={setLength}
            max={100}
            step={10}
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/30 py-3 px-6">
        <Button
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => setIcebreaker('')}
        >
          <Brush size={16} className="mr-1.5" />
          Clear
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={generating}
          size="sm"
          className="bg-ohhey-blue hover:bg-ohhey-blue/90 text-white"
        >
          {generating ? (
            <>
              <RefreshCw size={16} className="mr-1.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} className="mr-1.5" />
              Generate
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IcebreakerGenerator;
