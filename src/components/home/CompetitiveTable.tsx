import { Check, X } from "lucide-react";

export function CompetitiveTable() {
  const features = [
    { name: "Flawless Sync", us: true, teleparty: true, discord: false },
    { name: "Live Reactions", us: true, teleparty: false, discord: false },
    { name: "Voice Chat (WebRTC)", us: true, teleparty: false, discord: true },
    { name: "Screen Share", us: true, teleparty: false, discord: true },
    { name: "Premium Aesthetics", us: true, teleparty: false, discord: false },
    { name: "Browser Extension Free", us: true, teleparty: false, discord: true },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-background border-t border-border-default/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-display tracking-tighter sm:text-5xl text-text-primary">Why CineSync?</h2>
          <p className="max-w-[600px] text-text-secondary md:text-xl">
            See how we stack up against the alternatives.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-border-default text-text-secondary font-medium w-1/3">Feature</th>
                <th className="p-4 border-b border-border-default text-brand-primary font-bold text-center bg-brand-primary/5 rounded-t-lg">CineSync</th>
                <th className="p-4 border-b border-border-default text-text-secondary font-medium text-center">Teleparty</th>
                <th className="p-4 border-b border-border-default text-text-secondary font-medium text-center">Discord</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="hover:bg-bg-surface/50 transition-colors group">
                  <td className="p-4 border-b border-border-subtle font-medium text-text-primary group-hover:text-brand-primary transition-colors">
                    {feature.name}
                  </td>
                  <td className="p-4 border-b border-border-subtle text-center bg-brand-primary/5">
                    {feature.us ? <Check className="h-5 w-5 text-brand-primary mx-auto" /> : <X className="h-5 w-5 text-text-muted mx-auto" />}
                  </td>
                  <td className="p-4 border-b border-border-subtle text-center">
                    {feature.teleparty ? <Check className="h-5 w-5 text-text-muted mx-auto" /> : <X className="h-5 w-5 text-border-strong mx-auto" />}
                  </td>
                  <td className="p-4 border-b border-border-subtle text-center">
                    {feature.discord ? <Check className="h-5 w-5 text-text-muted mx-auto" /> : <X className="h-5 w-5 text-border-strong mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
