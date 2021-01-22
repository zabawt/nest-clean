import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Contract } from '../../../Domain/Entities/contract.entity';
import { ContractRepository } from '../../../Domain/Repositories/contract.repository';

export const ContractSchema = new mongoose.Schema({
  id: String,
  validFrom: Date,
  validTo: Date,
  userId: Number,
  created: Date,
  updated: Date,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ContractDocument = Contract & mongoose.Document<Contract>;

@Injectable()
export class MongoRepository implements ContractRepository {
  constructor(
    @InjectModel(Contract.name) private contractModel: Model<ContractDocument>,
  ) {}

  async find(id: string): Promise<Contract> {
    const {
      id: contractId,
      validTo,
      validFrom,
      created,
      updated,
      userId,
    } = await this.contractModel.findOne({ id: id });

    return new Contract(
      contractId,
      validFrom,
      validTo,
      userId,
      created,
      updated,
    );
  }

  async findAll(): Promise<Contract[]> {
    const contractDocuments = await this.contractModel.find();
    const contracts = contractDocuments.map(
      ({ id, validTo, validFrom, created, updated, userId }) =>
        new Contract(id, validFrom, validTo, userId, created, updated),
    );
    return contracts;
  }

  async save(contract: Contract): Promise<void> {
    const created = new this.contractModel(contract);
    created.save();
  }
}
