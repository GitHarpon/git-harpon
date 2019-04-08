import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GitService } from './git.service';
import 'gitgraph.js';

@Injectable()
export class GraphService {
    graph: any;
    graphSubject: Subject<any>;

    constructor(private gitService: GitService) {
        this.graphSubject = new Subject<any>();
    }

    setGraph() {
        this.gitService.getGraph().then((graph) => {
            this.graph = graph;
            this.graphSubject.next(this.graph);
        });
    }

    async drawGraph() {
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

        let MyTemplate = new GitGraph.Template(MyTemplateConfig);
        let CommitGraph = new GitGraph({ template: MyTemplate, orientation: 'vertical-reverse' });

        CommitGraph.branch('master');

        for (let Ind = 0; Ind < this.graph.length; Ind++) {
            CommitGraph.commit(
                {
                message: this.graph[Ind].message,
                sha1: this.graph[Ind].hash.substr(0, 6),
                author: this.graph[Ind].author_name
                }
            );
        }
    }
}
