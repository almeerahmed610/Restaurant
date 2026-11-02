import React from 'react';
import { Flame, Clock, Award, ShieldCheck, Heart, ChefHat, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-16 pb-16 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-amber-400" />
          <span>The Urban Tandoor Heritage</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Crafting Karachi's Charcoal Soul Since Day One
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Born out of a deep reverence for ancestral Pakistani tandoor craftsmanship and the vibrant, sleepless spirit of Karachi after midnight.
        </p>
      </div>

      {/* Main Narrative Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5 text-sm text-stone-300 leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-white">
            Where Tradition Meets Round-The-Clock Hospitality
          </h2>
          <p>
            In Karachi, great conversations happen over midnight Koyla Karahis and smoking seekh kababs. At Urban Tandoor &amp; Grill, we built a sanctuary for food lovers where charcoal embers never burn out, and kitchens stay fiercely active 24 hours a day, 7 days a week.
          </p>
          <p>
            Whether it is an early 7 AM Sunday breakfast of piping hot Halwa Puri and Lacha Parathas, an executive lunch on Shahrah-e-Faisal, or a 3 AM gathering of friends devouring mutton chops and tandoori roghani naans — every dish is cooked to precise recipe standards with zero compromises.
          </p>
          <div className="pt-2 flex items-center gap-6 text-xs font-mono text-amber-400">
            <div>
              <span className="text-2xl font-bold text-white block">24/7</span>
              <span>Kitchen Operations</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-white block">42</span>
              <span>Tables Across Karachi</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-white block">100%</span>
              <span>Halal &amp; Coal Smoked</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 group">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80" 
            alt="Charcoal BBQ Grill Craftsmanship at Urban Tandoor" 
            className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-800 text-xs">
            <p className="font-serif font-bold text-white text-sm">Authentic Clay Tandoor Pit</p>
            <p className="text-stone-400 text-[11px] mt-0.5">Fired at 450°C using hardwood charcoal for genuine aroma.</p>
          </div>
        </div>
      </div>

      {/* Culinary Principles */}
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">Our Core Philosophy</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">The 4 Pillars of Our Kitchen</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <h4 className="font-bold text-white text-base">Real Hardwood Coal</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              We never use artificial smoke liquid or gas ovens for our BBQ. Every skewer is kissed by genuine coal flames.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ChefHat className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Pure Desi Cow Ghee</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Our handis and gravies are prepared with unadulterated desi ghee and freshly stone-ground spices for wholesome richness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Recipe &amp; Stock Math</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every portion is systematically calculated against live inventory so that freshness is guaranteed and quality never wavers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">24/7 Karachi Loyalty</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Karachi never sleeps, and neither do our stoves. When you crave sizzling food at 4:30 AM, our chefs are ready at your service.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
