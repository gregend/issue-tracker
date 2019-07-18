/* global jest expect describe */
const IssuesModel = require('../../models/IssuesModel');
const IssueStatuses = require('../../constants/IssueStatuses');
const { ResourceNotFoundError } = require('../../constants/Errors');
describe('Models: issues:', () => {
   let dbMock;
   beforeEach(() => {
      dbMock = {
         issues: {}
      };
   });
   describe('create issue', () => {
      it('should add new issue and return it', () => {
         const { createIssue } = IssuesModel(dbMock);

         const expectedIssue = {
            id: expect.any(String),
            crtDate: expect.any(String),
            modDate: expect.any(String),
            title: 'title',
            description: 'description',
            status: IssueStatuses.OPEN
         };
         const expectedResult = {
            status: 'INSERT',
            id: expect.any(String),
            data: expectedIssue
         };
         const result = createIssue('title', 'description');
         expect(result).toEqual(expectedResult);
         expect(dbMock.issues[result.id]).toEqual(expectedIssue);
      });
   });

   describe('delete issue', () => {
      it('should delete issue if exists', () => {
         const customDbMock = {
            issues: {
               issueId: {
                  id: 'issueId',
                  crt_date: 'crt_date',
                  title: 'title',
                  description: 'description',
                  status: IssueStatuses.OPEN
               }
            }
         };
         const { deleteIssue } = IssuesModel(customDbMock);
         deleteIssue('issueId');
         expect(customDbMock.issues).toEqual({});
      });

      it(`should throw error if issue doesn't exist`, done => {
         const { deleteIssue } = IssuesModel(dbMock);
         try {
            deleteIssue('id');
         } catch (error) {
            expect(error).toBeInstanceOf(ResourceNotFoundError);
            done();
         }
      });
   });
   describe('update issue', () => {
      it(`should update issue with given data`, () => {
         const customDbMock = {
            issues: {
               issueId: {
                  id: 'issueId',
                  crtDate: 'crtDate',
                  modDate: 'modDate',
                  title: 'title',
                  description: 'description',
                  status: IssueStatuses.OPEN
               }
            }
         };
         const { updateIssue } = IssuesModel(customDbMock);
         const data = {
            title: 'newTitle',
            description: 'newDescription',
            status: IssueStatuses.DONE
         };
         const expectedUpdatedIssue = {
            id: 'issueId',
            crtDate: 'crtDate',
            modDate: expect.any(String),
            ...data
         };
         updateIssue('issueId', data);
         expect(customDbMock.issues['issueId']).toEqual(expectedUpdatedIssue);
      });
      it(`should throw error if issue doesn't exist`, done => {
         const { updateIssue } = IssuesModel(dbMock);
         try {
            updateIssue('id', {});
         } catch (error) {
            expect(error).toBeInstanceOf(ResourceNotFoundError);
            done();
         }
      });
   });
});