import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Contract } from '../../../domain/entities/contract.entity';
import { ContractRepository } from '../../../domain/repositories/contract.repository';
import { Query } from '../../../domain/repositories/query.interface';

export const ContractSchema = new mongoose.Schema({
  id: String,
  validFrom: Date,
  validTo: Date,
  userId: String,
  created: Date,
  updated: Date,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ContractDocument = Contract & mongoose.Document;

@Injectable()
export class MongoRepository implements ContractRepository {
  constructor(
    @InjectModel(Contract.name)
    private contractModel: mongoose.Model<ContractDocument>,
  ) {}

  private transform(contractDocument: ContractDocument): Contract {
    const {
      id,
      validTo,
      validFrom,
      created,
      updated,
      userId,
    } = contractDocument;

    return new Contract(id, validFrom, validTo, userId, created, updated);
  }

  private transformMany(contractDocuments: ContractDocument[]): Contract[] {
    const contracts = contractDocuments.map((contractDocument) =>
      this.transform(contractDocument),
    );
    return contracts;
  }

  async find(id: string): Promise<Contract> {
    const contractDocument = await this.contractModel.findOne({ id: id });

    return this.transform(contractDocument);
  }

  async findAll(): Promise<Contract[]> {
    const contractDocuments = await this.contractModel.find();
    return this.transformMany(contractDocuments);
  }

  async save(contract: Contract): Promise<void> {
    const created = new this.contractModel(contract);
    created.save();
  }

  async findBy(query: Query<any>): Promise<Contract[]> {
    const contractDocuments = await this.contractModel.find(query);
    return this.transformMany(contractDocuments);
  }
}
