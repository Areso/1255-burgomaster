function calcAttackPhase (campaignType) {
  var attackVal = 0;
  var defenceVal = 0;
  if (game.attacker === 1) {
    if (game.myhero.atk) {
      attackVal = game.myhero.atk;
    }
    if (game.enemyHero && game.enemyHero.def) {
      defenceVal = game.enemyHero.def
    }
    console.log("%cENEMY ARMY FROM MAP: ", 'color: #333; background: #fc3; padding: 6px;', game.enemyHeroArmy);
    calcAutoBattle(game.myheroArmy, attackVal, game.enemyHeroArmy, defenceVal, campaignType);
    game.attacker = 2;
  }
  if (game.attacker === 2) {
    if (game.enemyHero && game.enemyHero.atk) {
      attackVal = game.enemyHero.atk;
    }
    if (game.myhero.def) {
      defenceVal = game.myhero.def
    }
    calcAutoBattle(game.enemyHeroArmy, attackVal, game.myheroArmy, defenceVal, campaignType);
    game.attacker = 1;
  }
}
function calcAutoBattle (attackerStack, attackerHeroAttack, defenderStack, defenderHeroDefence, campaignType) {
  console.log('--Attack start --');
  var startRoundStr = locObj.autobattle_journal_log_start.txt;
  var endRoundStr = locObj.autobattle_journal_log_end.txt;
  if (campaignType==="AutoCampaign") {
    postBattleLog(startRoundStr);
  }
  for (var attackerKey  in attackerStack.units) {
    if (attackerStack.units.hasOwnProperty(attackerKey)) {
      console.log('Attacker: ', attackerStack.units[attackerKey]);
      for (var defenderKey in defenderStack.units) {
        if (defenderStack.units.hasOwnProperty(defenderKey)) {
          var target = defenderStack.units[defenderKey];
          var dmg = game.calcDmg(attackerStack.units[attackerKey], attackerHeroAttack, defenderStack.units[defenderKey], defenderHeroDefence);
          console.log('DMG before round: ', dmg);
          dmg = Math.round(dmg);
          console.log(dmg);
          var attackerStr = locObj.autobattle_journal_log_dmg.txt.replace("%arg1", game.unitNameLoc(attackerStack.units[attackerKey].name)).replace("%arg2", dmg).replace("%arg3", game.unitNameLoc(target.name));
          if (dmg >= target.stackHealth) {
            console.log(`${target.name} is dying`);
            delete defenderStack.units[defenderKey];
            game.myhero[target.name] = 0;
            console.log("%c DEFENDER UNITS LIST: ", "background: purple; color: #ededed", defenderStack.units);
            attackerStr += ' '  + locObj.autobattle_journal_log_destroyed.txt.replace("%arg1", game.unitNameLoc(target.name));
            if (campaignType==="AutoCampaign") {
              postBattleLog(attackerStr);
            }
            if (isEmptyObj(defenderStack.units)) {
              game.isAutoBattle = false;
              game.checkWinner(campaignType);
              if (campaignType === "AutoCampaign") {
                game.attacker = 0;
              }
            }
          } else {
            var defenderLooses = parseInt(dmg / defenderStack.units[defenderKey].health);
            defenderStack.units[defenderKey].count -= defenderLooses;
            game.myhero[defenderKey] -= defenderLooses;
            target.stackHealth -= dmg;
            if (defenderLooses > 0) {
              attackerStr += ' ' + locObj.autobattle_journal_log_dead.txt.replace("%arg1", defenderLooses).replace("%arg2", game.unitNameLoc(target.name));
            }
            if (campaignType==="AutoCampaign") {
              postBattleLog(attackerStr);
            }
          }
        }
      }
    }
  }
  if (campaignType==="AutoCampaign") {
   postBattleLog(endRoundStr);
  }
  console.log('-- Attack turn ended --');
  console.log('-----------------------');
}
