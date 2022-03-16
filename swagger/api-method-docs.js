/**
 * @swagger
 * tags:
 *   - name: Karibu Zabuni API 
 *     description: Welcome to Zabuni application!
 *   - name: Auth
 *     description: login and signup(for suppliers only. Staff and contracting authority users created by admin)
 *   - name: Sectors
 *     description: Available sectors
 *   - name: Tenders
 *     description: Created by admin or user with role "contracting authority" belonging to company. A tender belongs to a certain sector and/or tender category
 *   - name: Company
 *     description: Companies/Organization owning tenders. Managed by admin and/or user with role "contracting authority"
 *   - name: Role
 *     description: Roles used in the system
 */
 
/**
 * @swagger
 * paths:
 *  /:
 *    get:
 *      summary: Get greeting message from Zabuni api
 *      responses:
 *        "200":
 *          description: GET reponse from API
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *  /api/auth/signup:
 *    post:
 *      summary: create a user
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/CreateUser"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to create user
 *  /api/auth/ca:
 *    post:
 *      summary: create a contracting authority user. Belongs to a company. Created by admin
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/CreateContractingAuthority"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to create user
 *  /api/auth/signin:
 *    post:
 *      summary: authenticate a user
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/LoginUser"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to verify user credentials
 *  /api/roles:
 *    get:
 *      summary: Get all roles
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *    post:
 *      summary: create a role
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/CreateRole"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to create role
 *  /api/sectors:
 *    get:
 *      summary: Get all Sectors
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *    post:
 *      summary: create a Sector
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/CreateSector"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to create sector
 *  /api/tenders:
 *    get:
 *      summary: Get all Tenders
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *    post:
 *      summary: create a Tender
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/CreateTender"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to create tender
 *  /api/tender/views/{tenderId}:
 *    post:
 *      summary: Update Tender Views
 *      parameters:
 *        - in: path
 *          name: tenderId
 *          type: integer
 *          required: true
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to update tender views
 *  /api/companies:
 *    get:
 *      summary: Get all companies
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *    post:
 *      summary: create a Company
 *      parameters:
 *        - in: body
 *          name: body
 *          schema: 
 *            $ref: "#/definitions/CreateCompany"
 *      responses:
 *        "200":
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "500":
 *          description: Failed to create company
 */

/**
 * @swagger
 * definitions:
 *   CreateUser:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       roles:
 *         type: array
 *     required:
 *       - username
 *       - email
 *       - password
 *       - roles
 *   CreateContractingAuthority:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       companyId:
 *         type: integer
 *       roles:
 *         type: array
 *     required:
 *       - username
 *       - email
 *       - password
 *       - roles
 *   LoginUser:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *     required:
 *       - username
 *       - password 
 *   CreateRole:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *     required:
 *       - name
 *       - description  
 *   CreateSector:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *     required:
 *       - name
 *       - description
 *   CreateTender:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       closing_date:
 *         type: string
 *       companyId:
 *         type: integer
 *       sectorId:
 *         type: integer
 *       tenderCategoryId:
 *         type: integer
 *       tenderSecurity:
 *         type: number
 *     required:
 *       - name
 *       - description
 *       - closing_date
 *       - companyId
 *       - sectorId
 *   CreateCompany:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       location:
 *         type: string
 *       website:
 *         type: string
 *       phone:
 *         type: string
 *       address: 
 *         type: string
 *       sectorId: 
 *         type: integer
 *     required:
 *       - name
 *       - description
 */