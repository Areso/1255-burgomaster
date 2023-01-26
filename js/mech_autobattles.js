function calcAttackPhase (campaignType) {
  // Section for enemyHero attack & defense values. Used in calcAutoBattle logic.
  const enemyHeroAttack = (game.enemyHero && game.enemyHero.atk) ? game.enemyHero.atk : 0;
  const enemyHeroDefense = (game.enemyHero && game.enemyHero.def) ? game.enemyHero.def : 0;

  switch (game.attacker) {
    case ATTACK_TURN.HERO: {
      calcAutoBattle(game.myheroArmy, game.myhero.atk, game.enemyHeroArmy, enemyHeroDefense, campaignType);
      game.attacker = ATTACK_TURN.ENEMY;
    } break;
    case ATTACK_TURN.ENEMY: {
      calcAutoBattle(game.enemyHeroArmy, enemyHeroAttack, game.myheroArmy, game.myhero.def, campaignType);
      game.attacker = ATTACK_TURN.HERO;
    } break;
    default: {
      console.warn('Unknown game.attacker turn value');
      game.isAutoBattle = false;
      game.attacker = ATTACK_TURN.HERO;
    }
  }
}

function calcAutoBattle (attackerStack, attackerHeroAttack, defenderStack, defenderHeroDefense, campaignType) {
  console.log('--Attack start --');

  const battleLog = {
    startRound: locObj.autobattle_journal_log_start.txt,
    attackerListPerRound: [],
    endRound: locObj.autobattle_journal_log_end.txt
  };

  for (let attackerKey  in attackerStack.units) {
    for (let defenderKey in defenderStack.units) {
      let target = defenderStack.units[defenderKey];
      let dmg = game.calcDmg(attackerStack.units[attackerKey], attackerHeroAttack, defenderStack.units[defenderKey], defenderHeroDefense);
      console.log('DMG before round: ', dmg);
      dmg = Math.round(dmg);
      console.log(dmg);
      let attackerStr = locObj.autobattle_journal_log_dmg.txt.replace("%arg1", game.unitNameLoc(attackerStack.units[attackerKey].name)).replace("%arg2", dmg).replace("%arg3", game.unitNameLoc(target.name));
      if (dmg >= target.stackHealth) {
        console.log(`${target.name} is dying`);
        delete defenderStack.units[defenderKey];
        console.log("%c DEFENDER UNITS LIST: ", "background: purple; color: #ededed", defenderStack.units);
        attackerStr += ' '  + locObj.autobattle_journal_log_destroyed.txt.replace("%arg1", game.unitNameLoc(target.name));
        if (isEmptyObj(defenderStack.units)) {
          game.isAutoBattle = false;
          game.checkWinner(campaignType);
        }
      } else {
        const defenderLooses = parseInt(dmg / defenderStack.units[defenderKey].health);
        defenderStack.units[defenderKey].count -= defenderLooses;
        target.stackHealth -= dmg;
        if (defenderLooses > 0) {
          attackerStr += ' ' + locObj.autobattle_journal_log_dead.txt.replace("%arg1", defenderLooses).replace("%arg2", game.unitNameLoc(target.name));
        }
      }
      battleLog.attackerListPerRound.push(attackerStr);
    }
  }
  if (campaignType==="AutoCampaign") {
   postBattleLog(battleLog.startRound);
    battleLog.attackerListPerRound.forEach(function (logItem) {
     postBattleLog(logItem);
   });
   postBattleLog(battleLog.endRound);
  }
  console.log('-- Attack turn ended --');
  console.log('-----------------------');
}
