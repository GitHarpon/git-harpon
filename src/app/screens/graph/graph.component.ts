import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePreferencesService } from '../../providers/theme-preferences.service';
import { RightPanelService } from '../../providers/right-panel.service';
import { GraphService } from '../../providers/graph.service';
import 'gitgraph.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
  themePrefSubscription: Subscription;
  graph: string;
  graphSubscription: Subscription;
  currentTheme: string;

  constructor(private themePrefService: ThemePreferencesService, private rightPanelService: RightPanelService,
    private graphService: GraphService) { }

  ngOnInit() {
    this.themePrefSubscription = this.themePrefService.themePreferenceSubject.subscribe(
      (newTheme: string) => {
        this.currentTheme = newTheme;
      }
    );
    this.themePrefService.emitThemePreferencesSubject();

    this.graphSubscription = this.graphService.graphSubject.subscribe(
      (graph) => {
        this.graph = graph;
      }
    );
    this.graphService.setGraph();


    this.setCommitGraph();
  }


  openSendCommit() {
    this.rightPanelService.setView(false);
    return true;
  }

  setCommitGraph() {
    let MyTemplateConfig = {
      //colors: [ '#F00', '#0F0', '#00F' ], // branches colors, 1 per column
      branch: {
        lineWidth: 8,
        spacingX: 20
      },
      commit: {
        spacingY: -40,
        dot: {
          size: 10
        },
        message: {
          displayAuthor: false,
          displayBranch: false,
          displayHash: true,
          font: 'normal 12pt Arial'
        },
        shouldDisplayTooltipsInCompactMode: false
      }
    };
    let MyTemplate = new GitGraph.Template( MyTemplateConfig);
    let CommitGraph = new GitGraph({ template: MyTemplate });


    let Master = CommitGraph.branch('master');
    let Megabranch = CommitGraph.branch('megabranch');
    let Topicbranch = Megabranch.branch('topicbranch');
    let Anothertopic = Megabranch.branch('anothertopic');
    CommitGraph.commit({message: 'Commit on master', sha1: 'shaaa1'});
    Megabranch.commit('Create a megabranch');
    Megabranch.commit('Commit on megabranch');
    Master.commit({message: 'A commit to master', author: 'Cyrielle Angoula Meka'});
    Topicbranch.commit({message: 'A commit to topicbranch', author: 'Martin Blondel'});
    Master.merge(Megabranch);
    Topicbranch.commit({message: 'one more', author: 'Julien Besnier'});
    Anothertopic.commit({message: 'over and over', author: 'Clément Drouin'});
    Master.merge(Megabranch);
    Anothertopic.commit({message: 'encore un peu ça fait plaisir', author: 'Antoine Guillory'});
    Anothertopic.merge(Megabranch, {author: 'Julien Lamy'});
    Megabranch.commit('Et toc');
    Megabranch.merge(Anothertopic);
    Megabranch.commit('Last one');
    Anothertopic.merge(Megabranch, {author: 'Julien Lamy'});
    Master.commit({message: 'Vrai dernier'});
    Megabranch.merge(Master);

    // Faire test avec isomorphic
    // créer directement branche depuis le graphe pour ensuite associer au parentCommit ?? TODO



    // pour fermer le loader à la fin du rendu graph:render puis loader false
  }

  ngOnDestroy() {
    if (this.themePrefSubscription) {
      this.themePrefSubscription.unsubscribe();
    }
    if (this.graphSubscription) {
      this.graphSubscription.unsubscribe();
    }
  }
}
