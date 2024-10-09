import { Box, Typography, Stack } from "@mui/material";

export default function TermsOfService() {
    
    return (
      <div className='Content'>
            <h1 className='PageTitle'>
                Terms of Service
            </h1>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Box className='tos' >
                    <p>
                    Welcome to "Event Scheduler PRO", the event app that's almost as fun as the actual event! 
                    </p>
                    <p>
                    Before you boldly go where no party animal has gone before, we need you to agree to these totally serious and not-at-all-made-up-on-the-spot Terms of Service:
                    </p>

                    <ol>
                        <li>
                        Agreement to be Awesome: By using Event Scheduler PRO, you agree to have a ridiculously good time. If you're not having fun, you're doing it wrong. Seriously, go find some confetti and a dance floor.
                        </li>
                        <li>
                        No Party Poopers: Leave your negativity at the door (or, you know, the login screen). Event Scheduler PRO is a judgment-free zone, unless you're wearing socks with sandals. Then we reserve the right to judge.
                        </li>
                        <li>
                        Dance-Off Disputes: Any disagreements between users will be settled with an epic dance-off. The winner, as determined by the crowd's applause, gets to choose the next song. No breakdancing, unless you're actually good at it.
                        </li>
                        <li>
                        Overly Enthusiastic RSVPs: If you RSVP "yes" to an event and then don't show up, we'll assume you were abducted by aliens. You'll be excused, but we're keeping your spot in the dance-off.
                        </li>
                        <li>
                        Confetti Clause: Event Scheduler PRO is not responsible for any confetti explosions, glitter bombs, or spontaneous outbreaks of conga lines. However, we wholeheartedly encourage them.
                        </li>
                        <li>
                        Fashion Police: We reserve the right to ban any user who commits a serious fashion crime. This includes, but is not limited to, Crocs, fanny packs (unless ironically), and those weird toe shoes.
                        </li>
                        <li>
                        Blame it on the Algorithm: If Event Scheduler PRO suggests an event that turns out to be a total snoozefest, blame the algorithm. It's still in beta, and it has a weird obsession with mime conventions.
                        </li>
                        <li>
                        Limitation of Liability: Event Scheduler PRO is not responsible for any lost phones, spilled drinks, or embarrassing dance moves captured on social media. Remember, what happens at the event stays on the internet forever.
                        </li>
                        <li>
                        Force Majeure: In the event of a zombie apocalypse, robot uprising, or giant meteor strike, all bets are off. Seriously, just run.
                        </li>
                        <li>
                        Soul-Selling Disclaimer: By using Event Scheduler PRO, you agree to a totally non-binding and purely hypothetical agreement where you might, under certain celestial circumstances, sell your soul to a mysterious, yet impeccably dressed entity who may or may not go by the name of "Satan." Don't worry, it's just paperwork, and we promise your eternal damnation comes with free bottle service.
                        </li>
                        <li>
                        Have Fun! This is the most important rule of all. If you're not having fun, refer back to Rule #1.
                        </li>
                    </ol>
                </Box>
            </Box>
            
      </div>
  );
}